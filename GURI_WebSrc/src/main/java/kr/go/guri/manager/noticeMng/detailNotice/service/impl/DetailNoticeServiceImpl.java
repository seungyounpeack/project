package kr.go.guri.manager.noticeMng.detailNotice.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.noticeMng.detailNotice.service.DetailNoticeService;
/**
 * 관리자 > 공지 상세 Service Implement 클래스
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
@Service("detailNoticeService")
public class DetailNoticeServiceImpl implements DetailNoticeService {

	@Resource(name = "detailNoticeMapper")
	private DetailNoticeMapper detailNoticeMapper;
	
	@Override
	public Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return detailNoticeMapper.selectDetailList(params);
	}

	@Override
	public Map<String, Object> selectFileInfo(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return detailNoticeMapper.selectFileInfo(params);
	}

	@Override
	public List<Map<String, Object>> selectFilesInfo(Map<String, Object> params) throws SQLException, IOException {
		return detailNoticeMapper.selectFilesInfo(params);
	}

	@Override
	public List<Map<String, Object>> selectDetailInfo(Map<String, Object> params) throws SQLException, IOException {
		return detailNoticeMapper.selectDetailInfo(params);
	}

}
