package kr.go.guri.manager.noticeMng.insNotice.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.cmm.vo.FileVO;
import kr.go.guri.manager.noticeMng.insNotice.service.InsNoticeService;
/**
 * 관리자 > 공지사항 등록 Service Implement 클래스
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
@Service("insNoticeService")
public class InsNoticeServiceImpl implements InsNoticeService {

	@Resource(name = "insNoticeMapper")
	private InsNoticeMapper insNoticeMapper;
	
	@Override
	public int selectPk() throws SQLException , IOException {
		// TODO Auto-generated method stub
		return insNoticeMapper.selectPk();
	}

	@Override
	public int saveNotice(Map<String, Object> param) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return insNoticeMapper.saveNotice(param);
	}

	@Override
	public int noticeFileUp(FileVO fileVO) throws SQLException , IOException {
		// TODO Auto-generated method stub
		System.out.println("fileVO : "  + fileVO);
		return insNoticeMapper.noticeFileUp(fileVO);
	}

}
