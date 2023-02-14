package kr.go.guri.manager.noticeMng.updateNotice.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.cmm.vo.FileVO;
import kr.go.guri.manager.noticeMng.updateNotice.service.UpdateNoticeService;
/**
 * 관리자 > 공지사항 수정 Service Implement 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@Service("updateNoticeService")
public class UpdateNoticeServiceImpl implements UpdateNoticeService {

	@Resource(name = "updateNoticeMapper")
	private UpdateNoticeMapper updateNoticeMapper;
	
	@Override
	public int updateNotice(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return updateNoticeMapper.updateNotice(param);
	}

//	@Override
//	public int deleteFile(String filePk) throws SQLException, IOException {
//		// TODO Auto-generated method stub
//		return updateNoticeMapper.deleteFile(filePk);
//	}

	@Override
	public Map<String, Object> selectFileInfo(String filePk) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return updateNoticeMapper.selectFileInfo(filePk);
	}

	@Override
	public int deleteFile(Map<String, Object> param) throws SQLException, IOException {
		return updateNoticeMapper.deleteFile(param);

	}

	@Override
	public int updateFileUp(FileVO fileVO) throws SQLException, IOException {
		return updateNoticeMapper.updateFileUp(fileVO);
	}

	@Override
	public List<Map<String, Object>> selectUpdateList(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
