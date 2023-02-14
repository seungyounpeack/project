package kr.go.guri.manager.inquiryMng.detailInquiry.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.inquiryMng.detailInquiry.service.DetailInquiryService;
/**
 * 관리자 > 문의 상세 Service Implement 클래스
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
@Service("detailInquiryService")
public class DetailInquiryServiceImpl implements DetailInquiryService {

	@Resource(name = "detailInquiryMapper")
	private DetailInquiryMapper detailInquiryMapper;

	@Override
	public Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return detailInquiryMapper.selectDetailList(params);
	}

	@Override
	public int updateInquiry(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return detailInquiryMapper.updateInquiry(params);
	}

	@Override
	public int deleteInquiry(Map<String, Object> params) throws SQLException , IOException {
		// TODO Auto-generated method stub
		return detailInquiryMapper.deleteInquiry(params);
	}

	@Override
	public int insertInquiry(Map<String, Object> params) throws Exception {
		// TODO Auto-generated method stub
		return detailInquiryMapper.insertInquiry(params);
	}
	
}
